"use client";

import { useState } from "react";
import { Plus, Globe, FileText, Eye, Pencil, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeaderConnected } from "@/components/alibabos-ui/header";
import { useRouter } from "next/navigation";
import { sites, drafts } from "@/mockData/data";
import { AuthGuard } from "../../lib/checkAuth"
import {LogoutButton} from "@/components/ui/logout-button";


function ProfilePage() {
  const [activeTab, setActiveTab] = useState("published");
  const router = useRouter();

  const displayedSites = activeTab === "published" ? sites : drafts;

  const handleNewSite = () => {
    router.push("/create");
  };

  const handleUpdate = () => {
    router.push("/update");
  };

  const handleView = () => {
    router.push("/view");
  };

  return (
    <AuthGuard>
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-emerald-50/30">
      {/* Header */}
      <HeaderConnected />

      {/* Main Content */}

      <main className="max-w-7xl mx-auto px-8 py-12">
        <LogoutButton />
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-linear-to-b from-black to-emerald-200 text-white text-xl">
                J
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-medium text-gray-800 tracking-tight">
                Mathis BEGON
              </h1>
              <p className="text-base text-gray-500">mathis.begon@gmail.com</p>
            </div>
          </div>
          <Button
            onClick={handleNewSite}
            className="bg-linear-to-r from-black to-black/80 hover:from-black/90 hover:to-black/70"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau site
          </Button>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8 w-full"
        >
          <TabsList className="bg-gray-100 p-1 w-full flex">
            <TabsTrigger
              value="published"
              className="gap-2 flex-1 justify-center text-center"
            >
              <Globe className="w-4 h-4" />
              <span>Sites publiés ({sites.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="drafts"
              className="gap-2 flex-1 justify-center text-center"
            >
              <FileText className="w-4 h-4" />
              <span>Brouillons ({drafts.length})</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Sites List */}
        <div className="space-y-4">
          {displayedSites.map((site) => (
            <Card
              key={site.id}
              className="border border-gray-100 hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <h3 className="text-base font-medium text-gray-800">
                      {site.name}
                    </h3>
                    <p className="text-sm text-gray-500">{site.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-900">
                      <span>{site.url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        site.status === "published" ? "default" : "secondary"
                      }
                      className={
                        site.status === "published"
                          ? "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20"
                          : ""
                      }
                    >
                      {site.status === "published" ? "Publié" : "Brouillon"}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleUpdate}
                        variant="outline"
                        size="sm"
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                      <Button onClick={handleView} variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {displayedSites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {activeTab === "published"
                ? "Aucun site publié pour le moment"
                : "Aucun brouillon"}
            </p>
          </div>
        )}
      </main>
    </div>
    
    </AuthGuard>
  );
}

export default ProfilePage;
